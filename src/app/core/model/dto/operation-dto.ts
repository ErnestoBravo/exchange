import { ElementTypeDto } from "./element-type-dto";

export class OperationDto {

    operationId: number;
    operationType: ElementTypeDto;
    operationSubType: ElementTypeDto;
    mission: ElementTypeDto;
    shipId: number;
    terminalId: number;
    startDate: Date;
    endDate: Date;
    imo: boolean;

    gatheringRequestNumberId: number;
    gatheringRequestNumber: string;

    storerId: number;
    storer: string;

    rotationNumberId: number;
    rotationNumber: string;

    quantityCnt20Id: number;
    quantityCnt20: string;

    quantityCnt40Id: number;
    quantityCnt40: string;

    quantityVehiclesId: number;
    quantityVehicles: string;

    shippingCompanyId: number;
    shippingCompany: string;

    shippingAgentId: number;
    shippingAgent: string;

    automaticVehicleRequestId: number;
    automaticVehicleRequest: string;

    tonsId: number;
    tons: string;

    operatorId:number;
    operator:string;
}
