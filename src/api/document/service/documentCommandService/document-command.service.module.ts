import { Module } from '@nestjs/common';
import { DocumentCommandService } from './document-command.service';
import { COMMON_IDENTIFIERS } from 'src/injectTokens';
import { DocumentQueryServiceModule } from '../documentQueryService/document-query.service.module';

@Module({
    imports: [DocumentQueryServiceModule],
    providers: [
        {
            provide: COMMON_IDENTIFIERS.IDocumentCommandService,
            useClass: DocumentCommandService,
        }
    ],
    exports: [
        COMMON_IDENTIFIERS.IDocumentCommandService,
    ],
})
export class DocumentCommandServiceModule { }
