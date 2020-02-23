import { IDocumentRepository, ICreateDocument, IUpdateDocument } from './document.repository.interface';
import { RepositoryBase } from 'src/core/repository/base.repository';
import { DocumentEntity } from '../model/document.entity';
import { IDocument } from '../model/document.interface';
import { Repository } from 'typeorm';

export class DocumentRepository extends RepositoryBase<DocumentEntity> implements IDocumentRepository {
    protected entity: new () => DocumentEntity = DocumentEntity;

    public async createDocument(data: ICreateDocument): Promise<IDocument> {
        const repository: Repository<DocumentEntity> = await this.getRepository();

        const newDocument: DocumentEntity = new DocumentEntity();
        newDocument.text = data.text;

        const savedDocument: DocumentEntity = await repository.save(newDocument);

        return this.map(savedDocument);
    }

    public async findMany(): Promise<IDocument[]> {
        const repository: Repository<DocumentEntity> = await this.getRepository();

        const documents: DocumentEntity[] = await repository.find();

        return documents.map((d) => this.map(d));
    }

    public async findOne(id: number): Promise<IDocument> {
        const repository: Repository<DocumentEntity> = await this.getRepository();

        const document: DocumentEntity = await repository.findOne(id);

        return this.map(document);
    }

    public async checkWord(word: string): Promise<string> {
        const repository: Repository<DocumentEntity> = await this.getRepository();

        const foundWord: any = await repository.query(`SELECT ts_lexize('english_ispell', $1)`, [word]);

        return foundWord[0]['ts_lexize'];
    }

    public async getSimilarWord(word: string): Promise<string> {
        const repository: Repository<DocumentEntity> = await this.getRepository();

        const foundWords: any[] = await repository.query(`SELECT w.word, similarity(w.word, $1) AS sim`
            + ` FROM word w`
            + ` ORDER BY sim DESC`
            + ` LIMIT 1;`, [word]);
        
        return foundWords[0].word;
    }

    private map(entity: DocumentEntity): IDocument {
        if (!entity) {
            return null;
        }
        
        return {
            id: entity.id,
            text: entity.text,
        };
    }
}
