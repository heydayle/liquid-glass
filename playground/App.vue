<template>
  <div class="app-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Liquid Glass UI</h1>
        <p class="hero-subtitle">Experience the future of interface design with iOS 26's revolutionary liquid glass technology</p>
        <LGButton 
          label="Explore Components" 
          variant="primary" 
          size="large"
          @click="scrollToComponents"
        />
      </div>
    </section>

    <!-- Cards Showcase -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">Liquid Glass Cards</h2>
        <p class="section-description">Interactive cards with mouse tracking and glass morphism effects</p>
      </div>
      
      <div class="cards-grid">
        <LGCard
          title="Primary Card"
          description="Default card with standard glass effect and interactive hover states."
          variant="primary"
          @click="showNotification('Primary card clicked!')"
        />
        
        <LGCard
          title="Secondary Card"
          description="Subtle variant with reduced opacity for secondary content."
          variant="secondary"
          @click="showNotification('Secondary card clicked!')"
        />
        
        <LGCard
          title="Accent Card"
          description="Eye-catching variant with gradient borders and enhanced glow effects."
          variant="accent"
          @click="showNotification('Accent card clicked!')"
        />
        
        <LGCard
          title="Feature Card"
          description="Perfect for highlighting key features with beautiful animations."
          :show-accent="true"
          @click="showModal = true"
        >
          <template #default>
            <div class="custom-card-content">
              <div class="feature-icon">✨</div>
              <h3>Custom Content</h3>
              <p>Cards support custom slot content for maximum flexibility.</p>
            </div>
          </template>
        </LGCard>
      </div>
    </section>

    <!-- Buttons Showcase -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">Interactive Buttons</h2>
        <p class="section-description">Beautiful glass buttons with multiple variants and states</p>
      </div>
      
      <div class="buttons-showcase">
        <!-- Primary Buttons -->
        <div class="button-group">
          <h3 class="group-title">Primary Variants</h3>
          <div class="button-row">
            <LGButton 
              label="Primary Small" 
              variant="primary"
              size="small"
              @click="handleButtonClick('primary-small')"
            />
            <LGButton 
              label="Primary Medium" 
              variant="primary"
              size="medium"
              @click="handleButtonClick('primary-medium')"
            />
            <LGButton 
              label="Primary Large" 
              variant="primary"
              size="large"
              @click="handleButtonClick('primary-large')"
            />
          </div>
        </div>

        <!-- Secondary Buttons -->
        <div class="button-group">
          <h3 class="group-title">Secondary & Accent</h3>
          <div class="button-row">
            <LGButton 
              label="Secondary" 
              variant="secondary"
              @click="handleButtonClick('secondary')"
            />
            <LGButton 
              label="Accent" 
              variant="accent"
              @click="handleButtonClick('accent')"
            />
            <LGButton 
              label="Ghost" 
              variant="ghost"
              @click="handleButtonClick('ghost')"
            />
          </div>
        </div>

        <!-- State Buttons -->
        <div class="button-group">
          <h3 class="group-title">Button States</h3>
          <div class="button-row">
            <LGButton 
              label="Loading..." 
              variant="primary"
              :loading="isLoading"
              @click="handleLoadingDemo"
            />
            <LGButton 
              label="Disabled" 
              variant="secondary"
              :disabled="true"
            />
            <LGButton 
              label="Success" 
              variant="accent"
              @click="showNotification('Success!')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Form Inputs Showcase -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">Form Inputs</h2>
        <p class="section-description">Glass morphism form inputs with focus states and validation</p>
      </div>
      
      <div class="forms-showcase">
        <div class="form-group">
          <h3 class="group-title">Input Variants</h3>
          <LGCard variant="secondary" class="form-card">
            <form @submit.prevent="handleSubmit">
              <LGInput
                v-model="demoForm.name"
                label="Full Name"
                placeholder="Enter your full name"
              />
              
              <LGInput
                v-model="demoForm.email"
                label="Email Address"
                type="email"
                placeholder="example@domain.com"
                :error="emailError"
              />
              
              <LGInput
                v-model="demoForm.phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                suffix-icon="📞"
              />
              
              <LGInput
                v-model="demoForm.website"
                label="Website"
                type="url"
                placeholder="https://yoursite.com"
              >
                <template #suffix>🌐</template>
              </LGInput>
              
              <LGInput
                v-model="demoForm.message"
                label="Message"
                placeholder="Tell us about your project..."
              />
              
              <div class="form-actions">
                <LGButton 
                  label="Reset" 
                  variant="ghost"
                  @click="resetForm"
                />
                <LGButton 
                  label="Submit Form" 
                  variant="primary"
                  type="submit"
                />
              </div>
            </form>
          </LGCard>
        </div>
      </div>
    </section>

    <!-- Color Palette Showcase -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">Color Palette</h2>
        <p class="section-description">iOS 26 inspired color system with liquid glass effects</p>
      </div>
      
      <div class="color-showcase">
        <div class="color-group">
          <h3 class="group-title">Apple Colors</h3>
          <div class="color-grid">
            <div class="color-card apple-blue">
              <span class="color-name">Apple Blue</span>
              <span class="color-value">#007AFF</span>
            </div>
            <div class="color-card apple-purple">
              <span class="color-name">Apple Purple</span>
              <span class="color-value">#AF52DE</span>
            </div>
            <div class="color-card apple-pink">
              <span class="color-name">Apple Pink</span>
              <span class="color-value">#FF2D92</span>
            </div>
            <div class="color-card apple-orange">
              <span class="color-name">Apple Orange</span>
              <span class="color-value">#FF9500</span>
            </div>
          </div>
        </div>
        
        <div class="color-group">
          <h3 class="group-title">Glass Surfaces</h3>
          <div class="color-grid">
            <div class="color-card surface-primary">
              <span class="color-name">Primary Surface</span>
              <span class="color-value">rgba(255,255,255,0.08)</span>
            </div>
            <div class="color-card surface-secondary">
              <span class="color-name">Secondary Surface</span>
              <span class="color-value">rgba(255,255,255,0.12)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">Interactive Demo</h2>
        <p class="section-description">Experience the full liquid glass effect</p>
      </div>
      
      <div class="interactive-demo">
        <LGCard 
          title="Try Me!"
          description="Move your mouse over this card to see the liquid glass effect in action. Click to open the modal."
          variant="accent"
          @click="showModal = true"
        />
      </div>
    </section>

    <!-- Notifications -->
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>

    <!-- Modal -->
    <LGModal
      v-model="showModal"
      title="Liquid Glass Modal"
      size="medium"
    >
      <div class="modal-content">
        <h4>🌟 Modal Showcase</h4>
        <p>This modal demonstrates the liquid glass effect with:</p>
        <ul>
          <li>Backdrop blur and saturation</li>
          <li>Interactive mouse tracking</li>
          <li>Smooth entrance animations</li>
          <li>Beautiful glass morphism</li>
        </ul>
        
        <div class="modal-demo">
          <LGButton 
            label="Sample Action" 
            variant="accent"
            @click="showNotification('Modal action clicked!')"
          />
        </div>
      </div>
      
      <template #footer>
        <div class="modal-footer">
          <LGButton 
            label="Cancel" 
            variant="ghost"
            @click="showModal = false"
          />
          <LGButton 
            label="Confirm" 
            variant="primary"
            @click="closeModal"
          />
        </div>
      </template>
    </LGModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Component refs
const showModal = ref(false)
const isLoading = ref(false)
const emailError = ref('')
const notification = ref('')

// Form data
const demoForm = reactive({
  name: '',
  email: '',
  phone: '',
  website: '',
  message: ''
})

// Methods
const handleButtonClick = (variant: string) => {
  showNotification(`${variant} button clicked!`)
}

const handleLoadingDemo = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    showNotification('Loading completed!')
  }, 3000)
}

const handleSubmit = () => {
  // Validate email
  if (!demoForm.email.includes('@')) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  emailError.value = ''
  
  showNotification('Form submitted successfully!')
  console.log('Form submitted:', demoForm)
}

const resetForm = () => {
  Object.assign(demoForm, {
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  })
  emailError.value = ''
  showNotification('Form reset!')
}

const scrollToComponents = () => {
  const element = document.querySelector('.component-section')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const showNotification = (message: string) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

const closeModal = () => {
  showModal.value = false
  showNotification('Modal confirmed!')
}

// Initialize demo
onMounted(() => {
  // Set some sample data
  demoForm.name = 'John Doe'
  demoForm.email = 'john@example.com'
})
</script>

<style scoped>
/* App Container */
.app-container {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  background: linear-gradient(135deg, 
    hsl(220, 25%, 8%) 0%,
    hsl(240, 20%, 12%) 50%,
    hsl(260, 15%, 8%) 100%);
  color: rgba(255, 255, 255, 0.98);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* CSS Custom Properties */
.app-container {
  --glow-size: 400px;
  --background-hue: 220;
  --apple-blue: #007AFF;
  --apple-purple: #AF52DE;
  --apple-pink: #FF2D92;
  --apple-orange: #FF9500;
  --surface-primary: rgba(255, 255, 255, 0.08);
  --surface-secondary: rgba(255, 255, 255, 0.12);
  --text-primary: rgba(255, 255, 255, 0.98);
  --text-secondary: rgba(255, 255, 255, 0.75);
  --border-primary: rgba(255, 255, 255, 0.15);
  --border-hover: rgba(255, 255, 255, 0.25);
}

/* Background Effects */
.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: -1;
}

.app-container::after {
  content: '';
  position: fixed;
  top: 20vh;
  left: 10vw;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at 30% 30%, 
    var(--apple-blue) 0%, 
    var(--apple-purple) 40%, 
    transparent 70%);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(2px);
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(90deg); }
  50% { transform: translateY(0px) rotate(180deg); }
  75% { transform: translateY(-10px) rotate(270deg); }
}

/* Hero Section */
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, 
    var(--text-primary) 0%,
    var(--apple-blue) 50%,
    var(--apple-purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.5;
}

/* Component Sections */
.component-section {
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 16px;
  background: linear-gradient(135deg, 
    var(--text-primary) 0%,
    rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.section-description {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.custom-card-content {
  text-align: center;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Buttons Showcase */
.buttons-showcase {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.button-group {
  text-align: center;
}

.group-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Forms Showcase */
.forms-showcase {
  display: flex;
  justify-content: center;
}

.form-group {
  width: 100%;
  max-width: 500px;
}

.form-card {
  padding: 40px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
}

/* Color Showcase */
.color-showcase {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.color-group {
  text-align: center;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.color-card {
  padding: 32px 24px;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.color-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.color-name {
  display: block;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.color-value {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  font-family: 'SF Mono', Monaco, monospace;
}

/* Apple Colors */
.apple-blue {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.2), rgba(0, 122, 255, 0.1));
  border-color: rgba(0, 122, 255, 0.3);
}

.apple-purple {
  background: linear-gradient(135deg, rgba(175, 82, 222, 0.2), rgba(175, 82, 222, 0.1));
  border-color: rgba(175, 82, 222, 0.3);
}

.apple-pink {
  background: linear-gradient(135deg, rgba(255, 45, 146, 0.2), rgba(255, 45, 146, 0.1));
  border-color: rgba(255, 45, 146, 0.3);
}

.apple-orange {
  background: linear-gradient(135deg, rgba(255, 149, 0, 0.2), rgba(255, 149, 0, 0.1));
  border-color: rgba(255, 149, 0, 0.3);
}

.surface-primary {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.surface-secondary {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Interactive Demo */
.interactive-demo {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* Modal Content */
.modal-content h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.modal-content ul {
  margin: 16px 0;
  padding-left: 20px;
  color: var(--text-secondary);
}

.modal-content li {
  margin-bottom: 8px;
}

.modal-demo {
  margin-top: 24px;
  text-align: center;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Notification */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--surface-primary);
  backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 16px 24px;
  color: var(--text-primary);
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 48px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .button-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=SF+Mono:wght@400;500;600&display=swap');
</style>