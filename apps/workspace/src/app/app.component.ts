import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpFormEvent } from '@fdx-asgmt/components/sign-up';
import { environment } from '../environments/environment';

@Component({
  selector: 'fdx-asgmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public state: 'success' | 'error' | null = null;
  public title = 'fdx-asgmt';

  constructor(private http: HttpClient) {}

  public onFormEvent(event: SignUpFormEvent) {
    delete event.data.password;

    this.http.post(environment.signUpServiceUrl, event.data).subscribe({
      next: (result: any) => {
        this.state = 'success';
      },
      error: (err: any) => {
        this.state = 'error';
        console.log(err);
      },
    });
  }
}
