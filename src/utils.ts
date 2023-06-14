export default function parseXml(xml: any, tagName: string) {
   const parser = new DOMParser();
   const xmlDOM = parser.parseFromString(xml, 'application/xml');

   const data = xmlDOM.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;

   return JSON.parse(data || '');
}
