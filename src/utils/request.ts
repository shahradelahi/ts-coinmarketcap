import deepmerge from 'deepmerge';
import lodash from 'lodash';

import type { RequestOptions } from '@/types';
import type { GetQuotesLatestParams } from '@/types/v2';
import { delay } from '@/utils/delay';

type AnyFunc = (...args: any[]) => any;
type ResponseData<T extends AnyFunc> = Awaited<ReturnType<T>>['data'];

/**
 * Merges new data into an existing dataset.
 * Concatenates arrays or merges object properties.
 * @param existingData The current aggregated data (can be an array, object, or undefined).
 * @param newData The new data to merge.
 * @returns The merged data.
 */
function mergeData<T>(existingData: T | undefined, newData: T): T {
  if (Array.isArray(newData)) {
    const result = (existingData as any[] | undefined) ?? [];
    result.push(...newData);
    return result as T;
  }

  // For non-array data, we assume object merging.
  const result = deepmerge(existingData ?? {}, newData as any);
  return result as T;
}

function sizeData(data: any, sizeKey?: string): number {
  if (Array.isArray(data)) {
    return data.length;
  }

  return Object.keys(sizeKey ? data[sizeKey] : data).length;
}

function chunked(params: Pick<GetQuotesLatestParams, 'id' | 'slug'>, maxSize: number) {
  const ids = lodash.chunk(
    typeof params.id === 'string'
      ? params.id.split(',').map((id) => parseInt(id, 10))
      : Array.isArray(params.id)
        ? params.id
        : [params.id!],
    maxSize
  );
  const slugs = lodash.chunk(
    typeof params.id === 'string'
      ? params.slug?.toString().split(',')
      : Array.isArray(params.slug)
        ? params.slug
        : [params.slug!],
    maxSize
  );
  return { ids, slugs };
}

export function requiresChunkRequest(
  params: Pick<GetQuotesLatestParams, 'id' | 'slug'>,
  maxSize: number
): boolean {
  const { ids, slugs } = chunked(params, maxSize);

  return ids.length > 1 || slugs.length > 1;
}

export async function chunkedRequest<T extends AnyFunc>(
  thisArg: object,
  method: T,
  params: Pick<GetQuotesLatestParams, 'id' | 'slug'>,
  options: RequestOptions,
  maxSize: number
): Promise<ResponseData<T>> {
  let result: ResponseData<T> | undefined;
  const newParams = lodash.omit(params, ['id', 'slug']);

  const { ids, slugs } = chunked(params, maxSize);

  for (let i = 0; i < Math.max(ids.length, slugs.length); i++) {
    const response = await method.call(
      thisArg,
      {
        ...newParams,
        ...(ids[i] ? { id: ids[i] } : {}),
        ...(slugs[i] ? { slug: slugs[i] } : {}),
      },
      options
    );
    result = mergeData(result, response.data);
    await delay(100);
  }

  return result;
}

export async function pagedRequest<T extends AnyFunc>(
  thisArg: object,
  method: T,
  params: { start?: number; limit?: number } & {},
  options: RequestOptions,
  maxSize: number,
  dataKey?: string
): Promise<ResponseData<T>> {
  let result: ResponseData<T> | undefined;
  const newParams = lodash.omit(params, ['start', 'limit']);
  const args = { start: params.start || 1, limit: params.limit || 100 };

  for (let start = args.start; start < args.limit; start += maxSize) {
    const limit = Math.min(start + maxSize, args.limit) - start;
    const response = await method.call(thisArg, { ...newParams, start, limit }, options);

    result = mergeData(result, response.data);

    if (sizeData(response.data, dataKey) < limit) {
      break;
    }

    await delay(100);
  }

  return result;
}
