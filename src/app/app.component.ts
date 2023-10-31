import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'navigation-angular-left';
  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;
  @ViewChild('section4') section4!: ElementRef;
  section1InView = false;
  section2InView = false;
  section3InView = false;
  section4InView = false;
  sections!: ElementRef[];

  ngAfterViewInit() {
    this.sections = [this.section1, this.section2,this.section3,this.section4];
    this.onScroll();
  }

  // determinar qué sección está actualmente visible en la ventana
  @HostListener('window:scroll')
  onScroll() {
    // reset flags
    this.section1InView = false;
    this.section2InView = false;
    this.section3InView = false;
    this.section4InView = false;

    const sectionInView = this.getSectionInView();
    console.log(sectionInView);
    console.log(this.section1);

    //Determinar qué sección está actualmente visible en la ventana.
    if(sectionInView == this.section1) {
      this.section1InView = true;
    } else if(sectionInView == this.section2) {
      this.section2InView = true;
    }else if(sectionInView == this.section3){
      this.section3InView = true;
    }else if(sectionInView == this.section4){
      this.section4InView = true;
    }
  }

  //Se comprueba si tanto la parte superior como la parte inferior de una sección están dentro de la vista antes de considerarla como visible.
  // Parte superior: . Es el punto donde comienza el contenido de la sección,
  // Parte inferior: Es el punto donde termina el contenido de la sección, y también es importante considerar si este punto está dentro de la vista del usuario al desplazarse
  getSectionInView() {

    /**
     *
     * Recorremos todas las secciones y verificamos si tanto la parte superior como la parte inferior de una sección están dentro de la vista del usuario.
     */
    for (let i = 0; i < this.sections.length; i++) {
      console.log('i',i);

      const section = this.sections[i];
      const sectionNE = this.sections[i].nativeElement;

    // Calcular la posición de la parte superior e inferior de la sección en relación con la ventana.
    /**
     * getBoundingClientRect() devuelve un objeto con información sobre las dimensiones y la posición del elemento en relación con la ventana del navegador.
     */
      const sectionTop = sectionNE.getBoundingClientRect().top;
      const sectionBottom = sectionNE.getBoundingClientRect().bottom;
      console.log('sectionTop',sectionTop);
      console.log('sectionBottom',sectionBottom);
      console.log('window.innerHeight',window.innerHeight);

      /**
       * Cuando sectionBottom>= 0 quiere decir que  la parte inferior de la sección se encuentra dentro de la vista del usuario en ese momento,
       * lo que indica que la sección está parcial o completamente visible en la ventana.
       *
       * Cuando sectionTop <= window.innerHeight es para verificar si la parte superior de una sección está dentro de la vista de la ventana del
       * navegador en el momento dado.
       * sectionTop: la distancia desde la parte superior de la ventana hasta la parte superior de la sección.
       * window.innerHeight:la altura actual de la ventana del navegador, es decir, la altura visible en la pantalla
       *
       *
       * Si sectionTop es menor o igual a window.innerHeight, significa que la parte superior de la sección está dentro de la vista
       * de la ventana en ese momento. Esto indica que al menos parte de la sección es visible en la pantalla del usuario.
       * Si sectionTop es mayor que window.innerHeight, significa que la parte superior de la sección está fuera de la vista
       * de la ventana en ese momento, y la sección no es visible en la pantalla del usuario.
       */
      if (sectionTop <= window.innerHeight && sectionBottom >= 0) {
        return section;
      }

    }

    return null;
  }

  scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
