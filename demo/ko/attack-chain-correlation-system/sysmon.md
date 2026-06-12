### 탐지 방법 안내

| Sysmon Event ID | 언제 발생하나             | 쉽게 말하면              | 예시                                                                        |
| --------------: | ------------------- | ------------------- | ------------------------------------------------------------------------- |
|           **1** | 새 프로세스가 실행될 때       | “무엇이 실행됐는가?”        | `cmd.exe`, `powershell.exe`, `certutil.exe`, `curl.exe`, `wscript.exe` 실행 |
|           **3** | 프로세스가 네트워크 연결을 만들 때 | “그 프로세스가 어디로 나갔는가?” | `powershell.exe` 또는 `curl.exe`가 외부 URL / IP / Proxy로 접속                   |
|          **11** | 프로세스가 파일을 생성할 때     | “무엇을 만들었는가?”        | Temp/AppData/Public 경로에 `.exe`, `.ps1`, `.dll`, `.vbs`, `.aspx` 등 생성      |

기본 공격 체인으로 보면 아래 흐름입니다.

```text
Sysmon 1:
프로세스 실행

Sysmon 3:
실행된 프로세스의 외부 통신

Sysmon 11:
파일 생성 / 페이로드 드롭
```

즉:

```text
powershell.exe 실행
→ example.com 또는 Proxy로 통신
→ C:\Users\Public\update.exe 생성
```

이면 각각 다음처럼 볼 수 있습니다.

```text
Sysmon 1  = powershell.exe 실행
Sysmon 3  = powershell.exe 외부/Proxy 통신
Sysmon 11 = update.exe 파일 생성
```

Sysmon 3번은 단독으로 보기보다 Sysmon 1번의 Parent/Child 프로세스 실행과 연결해서 `Parent Process → Child Process → External Connection` 구조로 보는 것이 핵심입니다. Sysmon 11번은 외부 통신 이후 파일이 생성되면 다운로드 또는 페이로드 드롭 후보가 됩니다. 

Proxy 환경에서는 Sysmon 3의 목적지가 실제 외부 IP가 아니라 내부 Proxy로 보일 수 있습니다.

```text
powershell.exe
→ 172.16.10.20:3128
```

이 경우 “외부 통신이 없다”가 아니라, **Proxy를 통해 나간 것**으로 해석해야 합니다.

모의 해킹 담당자에게 요청할 테스트 조건은 간단히 이렇게 정리하면 됩니다.

```text
1. Sysmon 1 발생 조건
   cmd.exe / powershell.exe / curl.exe / certutil.exe 등 새 프로세스를 실행한다.

2. Sysmon 3 발생 조건
   해당 프로세스가 외부 URL, 외부 IP, 또는 내부 Proxy로 네트워크 연결을 시도한다.

3. Sysmon 11 발생 조건
   해당 프로세스가 Temp, AppData, Public, ProgramData, WebRoot 등에 파일을 생성한다.
```

권장 테스트 시나리오:

```text
cmd.exe
→ powershell.exe
→ curl.exe https://example.com
→ Temp 경로에 테스트 파일 생성
```

주의할 점은 Sysmon 설정에 따라 Event ID 3 또는 11은 필터링될 수 있습니다. 특히 Event ID 3은 NetworkConnect 수집이 켜져 있어야 하고, Event ID 11은 FileCreate 수집 정책에 포함된 경로/확장자/프로세스여야 기록됩니다.
