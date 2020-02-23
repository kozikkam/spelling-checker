import { IBaseRepository } from 'src/core/repository/base.repository.interface';
import { IDocument } from '../model/document.interface';

export interface IDocumentRepository extends IBaseRepository {
    createDocument(data: ICreateDocument): Promise<IDocument>;
    findMany(): Promise<IDocument[]>;
    findOne(id: number): Promise<IDocument>;
    checkWord(word: string): Promise<string>;
    getSimilarWord(word: string): Promise<string>;
}

export interface ICreateDocument extends Omit<IDocument, 'id'> {
}

export interface IUpdateDocument extends Omit<IDocument, 'id'> {
}
