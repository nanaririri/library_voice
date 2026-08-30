import { defineConfig } from 'vite';

export default defineConfig({
  // 프로젝트 루트의 index.html을 엔트리로 사용합니다.
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
