import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { Pose } from './models/pose.model';

@Component({
  selector: 'app-pose-detail-modal',
  template: `
    <div 
      (click)="close.emit()" 
      class="fixed inset-0 bg-[#0A0A0F]/80 backdrop-blur-md z-40 animate-fade-in"
      aria-hidden="true">
    </div>

    <div 
      role="dialog" 
      aria-modal="true" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        (click)="$event.stopPropagation()"
        class="bg-[#1A1A24]/80 backdrop-blur-xl border border-[#B4A0E8]/15 rounded-2xl shadow-2xl shadow-black/40 w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row animate-scale-in">
        
        <!-- Image Section -->
        <div class="relative w-full md:w-1/2 h-64 md:h-auto rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden flex-shrink-0">
          <img [src]="pose().imageUrl" [alt]="pose().englishName" width="600" height="800" class="w-full h-full object-cover">
          
          <!-- Prev/Next Buttons -->
          <button 
            (click)="previous.emit()"
            aria-label="Previous pose"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
    
          <button 
            (click)="next.emit()"
            aria-label="Next pose"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <!-- Content Section -->
        <div class="w-full md:w-1/2 flex flex-col min-h-0">
          <!-- Sticky Header -->
          <div class="flex-shrink-0 p-6 pb-4 border-b border-[#B4A0E8]/15 bg-[#1A1A24]/95 backdrop-blur-md z-10">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-2xl font-bold text-[#E8A0BF] font-lora">{{ pose().sanskritName }}</h2>
                <p class="text-[#B8B8C4]">{{ pose().englishName }} ({{ pose().pronunciation }})</p>
              </div>
              <button 
                (click)="close.emit()"
                class="text-[#6E6E7A] hover:text-white transition-colors"
                aria-label="Close modal">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
          
          <!-- Scrollable Details -->
          <div class="overflow-y-auto p-6">
            <div class="space-y-6 text-[#B8B8C4]">
              <div>
                <h3 class="font-bold text-[#B4A0E8] mb-2 border-b border-[#B4A0E8]/20 pb-1">How to Do It</h3>
                <ul class="list-disc list-inside space-y-1 pl-2 text-sm">
                  @for(step of pose().howToDo; track step) {
                    <li>{{ step }}</li>
                  }
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-[#B4A0E8] mb-2 border-b border-[#B4A0E8]/20 pb-1">Practice Guide</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                  @for(level of pose().frequency; track level.level) {
                    <div class="bg-[#242430]/50 rounded-lg p-2 border border-white/10 text-center">
                      <h4 class="font-bold text-sm mb-2"
                          [class.text-green-400]="level.level === 'Beginner'"
                          [class.text-sky-400]="level.level === 'Intermediate'"
                          [class.text-fuchsia-400]="level.level === 'Advanced'">
                        {{ level.level }}
                      </h4>
                      <div class="text-xs space-y-1 text-[#B8B8C4]">
                        @if (level.duration) {
                          <p><strong class="font-medium text-white/70">Time:</strong> {{ level.duration }}</p>
                        }
                        @if (level.sets) {
                          <p><strong class="font-medium text-white/70">Sets:</strong> {{ level.sets }}</p>
                        }
                        @if (level.reps) {
                          <p><strong class="font-medium text-white/70">Reps:</strong> {{ level.reps }}</p>
                        }
                        <p><strong class="font-medium text-white/70">Freq:</strong> {{ level.frequency }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div>
                <h3 class="font-bold text-[#B4A0E8] mb-2 border-b border-[#B4A0E8]/20 pb-1">Why You Should Do It</h3>
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
  imports: []
})
export class PoseDetailModalComponent {
  pose = input.required<Pose>();
  close = output<void>();
  previous = output<void>();
  next = output<void>();
}
