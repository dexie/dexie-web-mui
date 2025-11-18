import { collectDocsRoutes } from "@/utils/parseMarkdownSections";
import path from "path";

/** This route is not needed in production because all its job is done
 * in generate-offline-manifest.mts at build time 
 * and the sw.ts will use the generated offline-manifest.json directly
 * to index the full-text search data.
 * 
 * However, during development mode, we need this route to provide
 * the full-text search data to the service worker so that it can
 * index the data for offline search.
 * 
 * Also in case service worker is not supported, this route can be used
 * to provide the full-text search data to the client-side code.
 */
export async function GET() {
    try {
        // I Next.js behöver du använda process.cwd() för att få projektets rotmapp
        const docsDir = path.join(process.cwd(), "docs");
        
        const { docRoutes } = collectDocsRoutes(docsDir);
        
        return Response.json({
            docRoutes,
            generatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error collecting docs routes:', error);
        return Response.json({ error: 'Failed to collect docs routes' }, { status: 500 });
    }
}
