import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class VideoConfigService {
    $selectedElements = new BehaviorSubject([]);
    setElementDataForConfig = new Subject();
    constructor() {

    }
}