import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { COMMON_REPOSITORIES } from 'src/injectTokens';
import { IDocumentRepository } from '../../repository/document.repository.interface';
import { IDocument } from '../../model/document.interface';
import { IDocumentQueryService } from './document.query.service.interface';

@Injectable()
export class DocumentQueryService implements IDocumentQueryService {
    constructor(
        @Inject(COMMON_REPOSITORIES.IDocumentRepository)
        private readonly _documentRepository: IDocumentRepository,
    ) { }

    public async getMisspelledWords(documentOrId: IDocument | number): Promise<string[]> {
        const document: IDocument = await this.getDocument(documentOrId);

        const words: string[] = document.text.match(/\b(\w+)\b/g);
        const misspelledWords: string[] = (await Promise.all(words.map(async (word) => {
            const foundWord: string = await this._documentRepository.checkWord(word);
            if (!foundWord) {
                return word;
            }
        }))).filter((word) => word);

        return misspelledWords;
    }

    public async getDocument(documentOrId: IDocument | number): Promise<IDocument> {
        if (typeof documentOrId === 'number') {
            const document: IDocument = await this._documentRepository.findOne(documentOrId as number);
            if (!document) {
                throw new NotFoundException('No such document');
            }

            return document;
        } else {
           return documentOrId as IDocument;
        }
    }

    public async fetchDocuments(): Promise<IDocument[]> {
        return this._documentRepository.findMany();
    }
}
