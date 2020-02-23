import {
    Body,
    Controller,
    Post,
    UsePipes,
    Inject,
    Get,
    Patch,
    Param,
    ParseIntPipe,
    NotFoundException,
} from '@nestjs/common';
import { COMMON_PATHS, COMMON_IDENTIFIERS } from 'src/injectTokens';
import { ApiUseTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/core/validator/validation.pipe';
import { IDocumentCommandService } from './service/documentCommandService/document-command.service.interface';
import { CheckDocumentDto, CheckDocumentResponseDto } from './dto/check-document.dto';
import { OkResponse } from 'src/core/response/ok.response';
import { Response } from 'src/core/response/response';
import { IDocument } from './model/document.interface';
import { IDocumentQueryService } from './service/documentQueryService/document.query.service.interface';

@ApiUseTags('documents')
@Controller(`${COMMON_PATHS.apiV1}${COMMON_PATHS.document}`)
export class DocumentController {
    constructor(
        @Inject(COMMON_IDENTIFIERS.IDocumentCommandService)
        private readonly _documentCommandService: IDocumentCommandService,
        @Inject(COMMON_IDENTIFIERS.IDocumentQueryService)
        private readonly _documentQueryService: IDocumentQueryService,
    ) { }

    @Post()
    @UsePipes(new ValidationPipe())
    public async checkDocument(
        @Body() data: CheckDocumentDto,
    ): Promise<Response<CheckDocumentResponseDto>> {
        const savedDocument: IDocument = await this._documentCommandService.createDocument(data.text);
        const misspelledWords: string[] = await this._documentQueryService.getMisspelledWords(savedDocument);

        return new OkResponse({
            documentId: savedDocument.id,
            misspelledWords,
        });
    }

    @Post('/:documentId/corrected')
    public async correctDocument(
        @Param('documentId', new ParseIntPipe()) documentId: number,
    ): Promise<Response<IDocument>> {
        const correctedDocument: IDocument = await this._documentCommandService.correctDocument(documentId);
        
        return new OkResponse(correctedDocument);
    }

    @Get()
    @UsePipes(new ValidationPipe())
    public async getDocuments(): Promise<Response<IDocument[]>> {
        const documents: IDocument[] = await this._documentQueryService.fetchDocuments();
        return new OkResponse(documents);
    }
}
