import { Component,OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit{
  empleado : Empleado;
  id:number;
  constructor(private route:ActivatedRoute,private empleadoService:EmpleadoService, private router:Router){}
  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.empleado  = new Empleado();
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe(dato => {
      this.empleado = dato;
      });
  }
  guardarEmpleado(){
    this.empleadoService.actualizarEmpleado(this.id,this.empleado).subscribe(dato => {
      console.log(dato);
      this.irALaListaDeEmpleados();
  },error => console.log(error));
  }

  irALaListaDeEmpleados(){
    this.router.navigate(['/empleados']);
  }
  
  onSubmit(): void{
    this.guardarEmpleado();
  }

}
