# STATUS — photo-uploader-kit

> **v0.1** · ported 2026-05-30 from KPPDF `shared/ui/kp-photo-uploader.component.ts`

## Done

- [x] `<pu-photo-uploader [(photos)]="photos" />` — gallery, drag-drop, URL input, frame editor, zoom
- [x] `PhotoItem` type (url, position, scale)
- [x] `providePhotoUploaderKit(config)` — optional dropzone hint, maxPhotos
- [x] Plain HTML UI (no ui-primeng-kit dependency)
- [x] Demo in `schema-table-kit/demo/pages/photo-uploader-kit/`
- [x] Unit tests (types + hub spec)

## Notes

- KPPDF uses `KpInput` / `KpButton` / PrimeIcons; portable v0.1 uses native controls.
- Gallery base styles merged from `kp-table.component.scss` + `kp-photo-uploader.component.scss`.

## Next

- [ ] Optional ui-primeng-kit skin
- [ ] Upload to server hook (instead of base64 only)
- [ ] Standalone demo app in `photo-uploader-kit/demo/`
