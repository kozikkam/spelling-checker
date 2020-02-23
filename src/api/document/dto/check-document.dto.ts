import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CheckDocumentDto {
    @ApiModelProperty()
    @IsString()
    public readonly text: string;
}

export class CheckDocumentResponseDto {
    public readonly documentId: number;
    public readonly misspelledWords: string[];
}
