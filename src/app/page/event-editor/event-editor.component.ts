import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap((params) =>
      params['id'] === '0'
        ? of(new Event())
        : this.eventService.get(params['id'])
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, event: Event) {
    if (event.id === 0) {
      this.eventService.create(eventForm.value).subscribe((response) => {
        this.router.navigate(['']);
        this.toastr.success('Event has been created!', 'Success', {
          timeOut: 3000,
        });
      });
    } else {
      this.eventService.update(event).subscribe((response) => {
        this.router.navigate(['']);
        this.toastr.success('Event has been edited!', 'Success', {
          timeOut: 3000,
        });
      });
    }
  }
}
