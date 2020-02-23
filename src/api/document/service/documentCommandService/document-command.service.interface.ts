import { IDocument } from '../../model/document.interface';

export interface IDocumentCommandService {
    createDocument(text: string): Promise<IDocument>;
    correctDocument(documentOrId: IDocument | number): Promise<IDocument>;
}
