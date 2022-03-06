import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { CoverageArea } from '@core/dtos/coverage-area.dto';

@Injectable({
  providedIn: 'root'
})
export class NetworkCoverageService {
  /**
   * The network coverage service URL.
   */
  protected readonly serviceURL: string;

  /**
   * Constructs the network coverage service.
   * @param httpClient The HTTP client.
   */
  constructor(private readonly httpClient: HttpClient) {
    this.serviceURL = `http://${environment.networkCoverage.host}:${environment.networkCoverage.port}/network-coverage`;
  }


  /**
   * Returns all the network coverage areas.
   */
  public getNetworkCoverageAreas(): Observable<CoverageArea[]> {
    return this.httpClient.get<CoverageArea[]>(this.serviceURL);
  }
}
