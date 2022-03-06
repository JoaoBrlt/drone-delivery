import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { UrbanArea } from '@core/dtos/urban-area.dto';

@Injectable({
  providedIn: 'root'
})
export class AirTrafficAuthorityService {
  /**
   * The air traffic authority service URL.
   */
  protected readonly serviceURL: string;

  /**
   * Constructs the air traffic authority service.
   * @param httpClient The HTTP client.
   */
  constructor(private readonly httpClient: HttpClient) {
    this.serviceURL = `http://${environment.airTrafficAuthority.host}:${environment.airTrafficAuthority.port}/air-traffic-authority`;
  }

  /**
   * Returns all known urban areas.
   */
  public getUrbanAreas(): Observable<UrbanArea[]> {
    return this.httpClient.get<UrbanArea[]>(this.serviceURL);
  }
}
