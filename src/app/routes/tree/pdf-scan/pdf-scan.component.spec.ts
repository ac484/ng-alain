import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TreePdfScanComponent } from './pdf-scan.component';

describe('TreePdfScanComponent', () => {
  let component: TreePdfScanComponent;
  let fixture: ComponentFixture<TreePdfScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreePdfScanComponent, HttpClientTestingModule, ReactiveFormsModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TreePdfScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.optionsForm).toBeDefined();
    expect(component.optionsForm.get('saveResult')).toBeTruthy();
    expect(component.optionsForm.get('pdfFirstPageOnly')).toBeTruthy();
  });

  it('should validate file types', () => {
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const result = component.beforeUpload(mockFile as any);
    expect(result).toBe(false); // Should return false to prevent auto upload
  });
});
