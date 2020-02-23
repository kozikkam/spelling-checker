import { Injectable, Inject } from '@nestjs/common';
import { IDocumentCommandService } from './document-command.service.interface';
import { COMMON_REPOSITORIES, COMMON_IDENTIFIERS } from 'src/injectTokens';
import { IDocumentRepository } from '../../repository/document.repository.interface';
import { IDocument } from '../../model/document.interface';
import { IDocumentQueryService } from '../documentQueryService/document.query.service.interface';

@Injectable()
export class DocumentCommandService implements IDocumentCommandService {
    constructor(
        @Inject(COMMON_IDENTIFIERS.IDocumentQueryService)
        private readonly _documentQueryService: IDocumentQueryService,
        @Inject(COMMON_REPOSITORIES.IDocumentRepository)
        private readonly _documentRepository: IDocumentRepository,
    ) { }

    public async createDocument(text: string): Promise<IDocument> {
        const createdDocument: IDocument = await this._documentRepository.createDocument({ text });

        return createdDocument;
    }

    public async correctDocument(documentOrId: IDocument | number): Promise<IDocument> {
        const document: IDocument = await this._documentQueryService.getDocument(documentOrId);

        const misspelledWords: string[] = await this._documentQueryService.getMisspelledWords(document);

        let correctedText: string = document.text;
        for (const word of misspelledWords) {
            correctedText = correctedText.replace(word, await this._documentRepository.getSimilarWord(word));
        }
        
        const createdDocument: IDocument = await this._documentRepository
            .createDocument({ text: correctedText });

        return createdDocument;
    }
}
