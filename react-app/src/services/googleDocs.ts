import axios from 'axios';

// Interface for document metadata
export interface GoogleDocMetadata {
  id: string;
  name: string;
  lastModified: Date;
}

// Interface for document content
export interface GoogleDocContent {
  id: string;
  content: string;
  rawContent?: string;
}

/**
 * Fetches text content from a Google Doc using the provided document ID
 * This uses the public export URL which doesn't require authentication for publicly accessible documents
 */
export async function getGoogleDocText(docId: string): Promise<string> {
  try {
    // Using the provided code approach for fetching document content
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    const response = await axios.get(exportUrl);
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch document: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching Google Doc:', error);
    throw new Error('Could not retrieve the document. Please check the document ID and ensure it is publicly accessible.');
  }
}

/**
 * Parses the raw text content into a more structured format
 * This is a simple implementation that could be enhanced based on specific needs
 */
export function parseDocContent(rawContent: string): GoogleDocContent {
  // For now, just return the raw content
  // This could be expanded to parse headings, lists, etc.
  return {
    id: Date.now().toString(), // Temporary ID
    content: rawContent,
    rawContent: rawContent
  };
}

/**
 * Mock function to simulate fetching a list of user's Google Docs
 * In a real implementation, this would use Google Drive API with authentication
 */
export async function getUserDocuments(): Promise<GoogleDocMetadata[]> {
  // This is a placeholder - in a real app, you would use Google Drive API
  return [
    {
      id: 'example1',
      name: 'Sample Document 1',
      lastModified: new Date()
    },
    {
      id: 'example2',
      name: 'Sample Document 2',
      lastModified: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];
}

/**
 * Validates a Google Doc ID format
 */
export function isValidGoogleDocId(docId: string): boolean {
  // Basic validation - Google Doc IDs are typically alphanumeric
  // This could be enhanced with more specific validation rules
  return /^[a-zA-Z0-9_-]{5,}$/.test(docId);
}
