import { LoadStrategy } from "@mikro-orm/core";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SeedManager } from "@mikro-orm/seeder";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export default defineConfig({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
        disableForeignKeys: false,
        snapshot: false,
        fileName: (timestamp: string, name?: string) => {
            if (!name) {
                throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
            }
            return `Migration${timestamp}_${name}`
        },
    },
    seeder: {
        path: 'dist/seeders',
        pathTs: 'src/seeders',
    },
    loadStrategy: LoadStrategy.JOINED,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    extensions: [EntityGenerator, Migrator, SeedManager],
    cache: {
        enabled: false,
    },
});
