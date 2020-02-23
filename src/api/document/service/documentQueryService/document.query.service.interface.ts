import { IDocument } from '../../model/document.interface';

export interface IDocumentQueryService {
    getMisspelledWords(document: IDocument | number): Promise<string[]>;
    getDocument(documentOrId: IDocument | number): Promise<IDocument>;
    fetchDocuments(): Promise<IDocument[]>;
}
