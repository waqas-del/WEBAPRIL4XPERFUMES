import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PixelService, PixelSettings } from '../../services/pixel.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        @if (!isAuthenticated()) {
          <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-12">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                <mat-icon style="font-size: 32px; width: 32px; height: 32px;">lock</mat-icon>
              </div>
              <h2 class="text-2xl font-serif font-bold text-gray-900">Admin Access</h2>
              <p class="text-sm text-gray-500 mt-2">Please enter the master password to manage tracking settings.</p>
            </div>
            <form (ngSubmit)="login()">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" [(ngModel)]="passwordInput" name="password" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" 
                       placeholder="Enter password" required>
                @if (loginError()) {
                  <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <mat-icon style="font-size: 14px; width: 14px; height: 14px;">error</mat-icon> Incorrect password.
                  </p>
                }
              </div>
              <button type="submit" class="w-full bg-gray-900 text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2">
                Unlock Settings <mat-icon style="font-size: 18px; width: 18px; height: 18px;">arrow_forward</mat-icon>
              </button>
            </form>
          </div>
        } @else {
          <div class="mb-8">
            <h1 class="text-3xl font-serif font-bold text-gray-900 mb-2">Tracking & Ads Settings</h1>
            <p class="text-gray-600">Manage your social media pixels and tracking tags. Tokens are stored locally.</p>
          </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6 sm:p-8">
            <form (ngSubmit)="saveSettings()">
              
              <!-- Meta Pixel -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <mat-icon class="text-blue-600">facebook</mat-icon> Meta (Facebook) Pixel ID
                </label>
                <input type="text" [(ngModel)]="settings.metaPixelId" name="metaPixelId" placeholder="e.g. 123456789012345" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
                <p class="mt-1 text-xs text-gray-500">Used for tracking PageView, ViewContent, AddToCart, and Purchase events.</p>
              </div>

              <!-- TikTok Pixel -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <mat-icon class="text-black">music_note</mat-icon> TikTok Pixel ID
                </label>
                <input type="text" [(ngModel)]="settings.tiktokPixelId" name="tiktokPixelId" placeholder="e.g. C1234567890ABCDEF" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
              </div>

              <!-- Google Tag -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <mat-icon class="text-red-500">travel_explore</mat-icon> Google Tag (gtag.js) ID
                </label>
                <input type="text" [(ngModel)]="settings.googleTagId" name="googleTagId" placeholder="e.g. G-XXXXXXXXXX or AW-XXXXXXXXXX" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
              </div>

              <!-- Snapchat Pixel -->
              <div class="mb-8">
                <label class="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <mat-icon class="text-yellow-400">snapchat</mat-icon> Snapchat Pixel ID
                </label>
                <input type="text" [(ngModel)]="settings.snapchatPixelId" name="snapchatPixelId" placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
              </div>

              <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                <p class="text-xs text-gray-500">
                  <mat-icon style="font-size: 14px; width: 14px; height: 14px; vertical-align: middle;">info</mat-icon>
                  Saving will reload the page to initialize the tracking scripts.
                </p>
                <div class="flex gap-3">
                  <button type="button" (click)="logout()" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium">
                    Lock
                  </button>
                  <button type="submit" class="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  private pixelService = inject(PixelService);
  
  isAuthenticated = signal(false);
  passwordInput = '';
  loginError = signal(false);

  settings: PixelSettings = {
    metaPixelId: '',
    tiktokPixelId: '',
    googleTagId: '',
    snapchatPixelId: ''
  };

  ngOnInit() {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      this.isAuthenticated.set(true);
    }
    this.settings = { ...this.pixelService.getSettings() };
  }

  login() {
    if (this.passwordInput === 'Master@9909') {
      this.isAuthenticated.set(true);
      this.loginError.set(false);
      this.passwordInput = '';
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('admin_auth', 'true');
      }
    } else {
      this.loginError.set(true);
    }
  }

  logout() {
    this.isAuthenticated.set(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('admin_auth');
    }
  }

  saveSettings() {
    this.pixelService.saveSettings(this.settings);
  }
}
