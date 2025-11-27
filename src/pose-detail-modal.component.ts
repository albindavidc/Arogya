import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pose } from './models/pose.model';

@Component({
  selector: 'app-pose-detail-modal',
  template: `
    <div 
      (click)="close.emit()" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
      aria-hidden="true">
    </div>

    <div 
      role="dialog" 
      aria-modal="true" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        (click)="$event.stopPropagation()"
        class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row animate-scale-in">
        
        <!-- Image Section -->
        <div class="w-full md:w-1/2 h-64 md:h-auto rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
          <img [ngSrc]="pose().imageUrl" [alt]="pose().englishName" width="600" height="800" class="w-full h-full object-cover">
        </div>

        <!-- Content Section -->
        <div class="w-full md:w-1/2 flex flex-col p-6 overflow-y-auto">
          <div class="flex-grow">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-2xl font-bold text-teal-800 font-lora">{{ pose().sanskritName }}</h2>
                <p class="text-stone-500">{{ pose().englishName }} ({{ pose().pronunciation }})</p>
              </div>
              <button 
                (click)="close.emit()"
                class="text-stone-400 hover:text-stone-800 transition-colors"
                aria-label="Close modal">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <!-- Details -->
            <div class="space-y-6 text-stone-700">
              <div>
                <h3 class="font-bold text-teal-700 mb-2 border-b border-teal-100 pb-1">How to Do It</h3>
                <ul class="list-disc list-inside space-y-1 pl-2 text-sm">
                  @for(step of pose().howToDo; track step) {
                    <li>{{ step }}</li>
                  }
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-teal-700 mb-2 border-b border-teal-100 pb-1">Frequency</h3>
                <p class="text-sm">{{ pose().howManyTimes }}</p>
              </div>

              <div>
                <h3 class="font-bold text-teal-700 mb-2 border-b border-teal-100 pb-1">Why You Should Do It</h3>
                <ul class="list-disc list-inside space-y-1 pl-2 text-sm">
                  @for(reason of pose().why; track reason) {
                    <li>{{ reason }}</li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { 
        opacity: 0;
        transform: scale(0.95);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-scale-in {
      animation: scaleIn 0.3s ease-out forwards;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage]
})
export class PoseDetailModalComponent {
  pose = input.required<Pose>();
  close = output<void>();
}