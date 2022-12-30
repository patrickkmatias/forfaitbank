import { Observable } from "rxjs";
import { ApiService } from "./services/api.service";
import { Injectable } from "@angular/core";
import { Operation } from "./models/operation.model";

@Injectable()
export class OperationService {
   constructor(private api: ApiService) {}

   findAll() {
      return this.api.get<Operation[]>("/operations");
   }

   findChildren(parentOperationId: number) {
      return this.api.post<Operation[]>(`/operations/${parentOperationId}`)
   }

   findOne(operationId: number) {
      return this.api.get<Operation>(`/operations/${operationId}`);
   }

   create(operation: Operation): Observable<Operation> {
      return this.api.post<Operation>("/operations", operation);
   }

   delete(operationId: number) {
      return this.api.delete(`/operations/${operationId}`);
   }
}
