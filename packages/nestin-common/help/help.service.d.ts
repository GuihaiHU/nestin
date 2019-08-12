import { ConfigService } from 'nestjs-config';
export declare class HelpService {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    storageUrl(filename: string): string;
    avatarUrl(filename: string): string;
    templateUrl(filename: string): string;
    getWorkType(d: Date): "day" | "night";
    getWorkInfo(d: Date): {
        workDate: Date;
        workType: string;
    };
}
