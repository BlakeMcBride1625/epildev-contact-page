import fs from 'fs-extra'
import path from 'path'

const TICKET_FILE = path.join(__dirname, '../../data/tickets.json')

export class TicketGenerator {
  private static instance: TicketGenerator
  private currentId: number = 0

  private constructor() {
    this.initializeTicketSystem()
  }

  public static getInstance(): TicketGenerator {
    if (!TicketGenerator.instance) {
      TicketGenerator.instance = new TicketGenerator()
    }
    return TicketGenerator.instance
  }

  private async initializeTicketSystem(): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(TICKET_FILE))
      
      if (await fs.pathExists(TICKET_FILE)) {
        const data = await fs.readJson(TICKET_FILE)
        this.currentId = data.lastId || 0
      } else {
        await fs.writeJson(TICKET_FILE, { lastId: 0, tickets: [] })
      }
    } catch (error) {
      console.error('Error initializing ticket system:', error)
      this.currentId = 0
    }
  }

  public async generateTicketId(): Promise<string> {
    this.currentId++
    const ticketId = this.currentId.toString().padStart(6, '0')
    
    try {
      const data = await fs.readJson(TICKET_FILE)
      data.lastId = this.currentId
      await fs.writeJson(TICKET_FILE, data, { spaces: 2 })
    } catch (error) {
      console.error('Error saving ticket ID:', error)
    }
    
    return ticketId
  }

  public async saveTicket(ticketData: any): Promise<void> {
    try {
      const data = await fs.readJson(TICKET_FILE)
      data.tickets.push(ticketData)
      await fs.writeJson(TICKET_FILE, data, { spaces: 2 })
    } catch (error) {
      console.error('Error saving ticket:', error)
    }
  }
}







