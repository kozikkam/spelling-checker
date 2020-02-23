import { Global, Module, ClassProvider } from '@nestjs/common';
import { COMMON_REPOSITORIES } from 'src/injectTokens';
import { DocumentRepository } from 'src/api/document/repository/document.repository';

const providers: ClassProvider[] = [
    {
        provide: COMMON_REPOSITORIES.IDocumentRepository,
        useClass: DocumentRepository,
    },
];

@Global()
@Module({
    providers,
    exports: providers.map((provider) => provider.provide),
})
export class RepositoryModule { }
