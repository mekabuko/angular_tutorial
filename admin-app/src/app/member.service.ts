import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
private membersUrl = 'api/members'

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMembers(): Observable<Member[]> {

    return this.http.get<Member[]>(this.membersUrl)
  }

  getMember(id: number): Observable<Member | undefined> {
    this.messageService.add(
      `MemberService: 社員データ(id=${id})を取得しました`
    );
    return of(MEMBERS.find((member) => member.id == id));
  }

  private log(message: string): void{
    this.messageService.add(`MemberService: ${message}`);
  }
}
