import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import { MarkdownSection, MDFullTextMeta } from "@/types/MDFullTextMeta";
import { generateHeadingIdFromString } from './headingId';

export function collectDocsRoutes(docsDir: string): { routes: string[]; docRoutes: MDFullTextMeta[] } {
  const routes = new Set<string>(['/docs']);
  const docRoutes: MDFullTextMeta[] = [];
  
  function walkSync(dir: string, base = ''): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        walkSync(full, path.join(base, item.name));
      } else if (item.isFile() && item.name.endsWith('.md')) {
        const slug = path.join(base, item.name.replace(/\.md$/, '')).replace(/\\/g, '/');
        const route = '/docs/' + slug;
        routes.add(route);
        
        // Parse frontmatter and content using gray-matter
        const fileContent = fs.readFileSync(full, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        const title = frontmatter.title as string | undefined;
        
        // Parse markdown sections synchronously
        const sections = parseMarkdownSectionsSync(content);
        
        docRoutes.push({
          route,
          title,
          sections
        });
      }
    }
  }
  
  if (fs.existsSync(docsDir)) {
    walkSync(docsDir);
  }
  
  return { routes: Array.from(routes).sort(), docRoutes };
}

export function parseMarkdownSectionsSync(content: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  let currentSection: Partial<MarkdownSection> = {
    title: '',
    level: 1
  }
  
  const ast = remark.parse(content);
  
  for (const node of ast.children) {
    if (node.type === 'heading') {
      // Save previous section if exists
      if (currentSection) {
        sections.push({
          level: currentSection.level!,
          title: currentSection.title ?? '',
          content: currentSection.content || '',
          slug: currentSection.title ? generateHeadingIdFromString(currentSection.title) : ''
        });
      }
      
      // Start new section
      currentSection = {
        level: (node as any).depth,
        title: (node as any).children.map((child: any) => child.value || '').join(''),
        content: ''
      };
    } else if (currentSection) {
      // Add content to current section
      const nodeText = remark.stringify(node as any);
      currentSection.content = (currentSection.content || '') + nodeText + '\n';
    }
  }
  
  // Add the last section
  if (currentSection) {
    sections.push({
      level: currentSection.level!,
      title: currentSection.title ?? '',
      content: currentSection.content || '',
      slug: currentSection.title ? generateHeadingIdFromString(currentSection.title) : ''
    });
  }
  
  return sections;
}
