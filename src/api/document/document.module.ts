import { Module } from '@nestjs/common';
import { DocumentCommandServiceModule } from './service/documentCommandService/document-command.service.module';
import { DocumentController } from './document.controller';
import { DocumentQueryServiceModule } from './service/documentQueryService/document-query.service.module';

@Module({
    imports: [
        DocumentCommandServiceModule,
        DocumentQueryServiceModule,
    ],
    controllers: [
        DocumentController,
    ],
})
export class DocumentModule { }
