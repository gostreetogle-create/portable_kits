# STATUS — photo-uploader-kit

> **v0.1** · 2026-05-30 — photo gallery with upload, drag-drop, frame editor

## Done

- [x] `<pu-photo-uploader [(photos)]="photos" />` — gallery, drag-drop, URL input, frame editor, zoom
- [x] `PhotoItem` type (url, position, scale)
- [x] `providePhotoUploaderKit(config)` — optional dropzone hint, maxPhotos
- [x] Plain HTML UI (no ui-primeng-kit dependency)
- [x] Demo in `schema-table-kit/demo/pages/photo-uploader-kit/`
- [x] Unit tests (types + hub spec)

## v0.2 Roadmap

- [ ] Multi-file upload
- [ ] Upload progress indicator
- [ ] Preview gallery with lightbox
- [ ] Optional ui-primeng-kit skin
- [ ] Upload to server hook (instead of base64 only)

## Notes

- KPPDF uses `KpInput` / `KpButton` / PrimeIcons; portable v0.1 uses native controls.
- Gallery base styles merged from `kp-table.component.scss` + `kp-photo-uploader.component.scss`.
