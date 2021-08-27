import * as fs from 'fs-extra';
import * as path from 'path';

fs.copySync(
  path.join(__dirname, '..', '..', 'documentation'),
  path.join(__dirname, '..', '..', 'dist', 'documentation')
);
