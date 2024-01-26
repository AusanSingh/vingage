import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class VideoConfigService {
    $selectedElements = new BehaviorSubject([]);
    constructor() {

    }
}