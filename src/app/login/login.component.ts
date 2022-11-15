import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  onSubmit() {
    if(this.form.valid) {
      const authSubscription = this.authService.login({
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      }).subscribe(
        res => {
          alert('Succeful')
        }
      )
    }
  }
}
