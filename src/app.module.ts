import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PuestoTrabajoModule } from './core/puesto-trabajo/puesto-trabajo.module';
import { EstadoModule } from './core/estado/estado.module';
import { PersonaModule } from './core/persona/persona.module';
import { HelloWorldModule } from './features/hello-world/hello-world.module';
import { GestionPuestosModule } from './features/gestion-puestos/gestion-puestos.module';

@Module({
  imports: [PrismaModule, PuestoTrabajoModule, EstadoModule, PersonaModule, HelloWorldModule, GestionPuestosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
