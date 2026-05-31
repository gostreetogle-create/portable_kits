import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import type { SelectOption } from '../core';

/**
 * Injectable factory that creates HTTP-based option loaders.
 *
 * Usage:
 * ```ts
 * const loader = inject(HttpOptionsLoader).createLoader('/api/statuses');
 * const options = await loader();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class HttpOptionsLoader {
  private readonly http = inject(HttpClient);

  /**
   * Create an OptionsLoader that fetches from a URL via HttpClient.
   * Expects the response to be an array of SelectOption objects.
   *
   * @param url — API endpoint that returns SelectOption[]
   * @returns An async loader function
   */
  createLoader(url: string): () => Promise<SelectOption[]> {
    return async () => {
      const response = await lastValueFrom(
        this.http.get<SelectOption[]>(url),
      );
      return response;
    };
  }
}
