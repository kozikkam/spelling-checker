import { Module } from '@nestjs/common';
import { COMMON_IDENTIFIERS } from 'src/injectTokens';
import { DocumentQueryService } from './document-query.service';

@Module({
    imports: [],
    providers: [
        {
            provide: COMMON_IDENTIFIERS.IDocumentQueryService,
            useClass: DocumentQueryService,
        }
    ],
    exports: [
        COMMON_IDENTIFIERS.IDocumentQueryService,
    ],
})
export class DocumentQueryServiceModule { }
