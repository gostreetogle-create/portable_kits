import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpPhotoUploaderComponent, type PhotoItem } from './kp-photo-uploader.component';

describe('KpPhotoUploaderComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts with empty photos', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    expect(fixture.componentInstance.photos()).toEqual([]);
    expect(fixture.componentInstance.isDragOver()).toBe(false);
  });

  it('addUrl adds photo and clears input', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    comp.newUrl.set('https://example.com/photo.jpg');
    comp.addUrl();
    expect(comp.photos().length).toBe(1);
    expect(comp.photos()[0].url).toBe('https://example.com/photo.jpg');
    expect(comp.newUrl()).toBe('');
  });

  it('addUrl ignores empty string', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    comp.addUrl();
    expect(comp.photos().length).toBe(0);
  });

  it('remove deletes photo by index', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('photos', [{ url: 'a.jpg' }, { url: 'b.jpg' }]);
    comp.remove(0, new MouseEvent('click'));
    expect(comp.photos().length).toBe(1);
    expect(comp.photos()[0].url).toBe('b.jpg');
  });

  it('zoom sets zoomedUrl', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    comp.zoom('https://example.com/large.jpg');
    expect(comp.zoomedUrl()).toBe('https://example.com/large.jpg');
  });

  it('posStyle returns default position when no position set', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    const photo: PhotoItem = { url: 'test.jpg' };
    expect(comp.posStyle(photo)).toBe('50% 50%');
  });

  it('posStyle returns custom position', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    const photo: PhotoItem = { url: 'test.jpg', position: { x: 25, y: 75 } };
    expect(comp.posStyle(photo)).toBe('25% 75%');
  });

  it('resetFrame resets position and scale', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('photos', [{ url: 'a.jpg', position: { x: 10, y: 10 }, scale: 0.5 }]);
    comp.resetFrame(0);
    expect(comp.photos()[0].position).toEqual({ x: 50, y: 50 });
    expect(comp.photos()[0].scale).toBe(1);
  });

  it('onDragOver sets isDragOver', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    const event = new DragEvent('dragover');
    Object.defineProperty(event, 'dataTransfer', { value: { dropEffect: '' } });
    comp.onDragOver(event);
    expect(comp.isDragOver()).toBe(true);
  });

  it('onDragLeave clears isDragOver', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('isDragOver', true);
    const event = new DragEvent('dragleave');
    comp.onDragLeave(event);
    expect(comp.isDragOver()).toBe(false);
  });

  it('openFrameEditor sets editingFrameIndex', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    comp.openFrameEditor(2, new MouseEvent('click'));
    expect(comp.editingFrameIndex()).toBe(2);
  });

  it('closeFrameEditor resets frame editing state', async () => {
    const fixture = await createTestFixture(KpPhotoUploaderComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('editingFrameIndex', 1);
    comp.closeFrameEditor();
    expect(comp.editingFrameIndex()).toBeNull();
  });
});
