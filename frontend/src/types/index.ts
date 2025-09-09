export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  ticketId?: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: 'discord' | 'instagram' | 'tiktok' | 'facebook'
  color: string
}

export interface ParticleConfig {
  particles: {
    number: {
      value: number
    }
    color: {
      value: string[]
    }
    shape: {
      type: string
    }
    opacity: {
      value: number
      random: boolean
    }
    size: {
      value: number
      random: boolean
    }
    line_linked: {
      enable: boolean
      distance: number
      color: string
      opacity: number
      width: number
    }
    move: {
      enable: boolean
      speed: number
      direction: string
      random: boolean
      straight: boolean
      out_mode: string
      bounce: boolean
    }
  }
  interactivity: {
    detect_on: string
    events: {
      onhover: {
        enable: boolean
        mode: string
      }
      onclick: {
        enable: boolean
        mode: string
      }
    }
    modes: {
      grab: {
        distance: number
        line_linked: {
          opacity: number
        }
      }
      bubble: {
        distance: number
        size: number
        duration: number
        opacity: number
        speed: number
      }
      repulse: {
        distance: number
        duration: number
      }
    }
  }
  retina_detect: boolean
}
