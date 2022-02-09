import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  eventList$: Observable<Event[]> = this.eventService.getAll();

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  openEventCreation() {
    this.router.navigate(['/event', 0]);
  }

  removeEvent(id: number) {
    this.eventService.remove(id).subscribe((success) => {
      // window.location.reload();
      this.eventList$ = this.eventService.getAll();
      this.toastr.success('Event has been deleted!', 'Success', {
        timeOut: 3000,
      });
    });
  }
}
