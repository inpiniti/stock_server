# Windows에서 `@tensorflow/tfjs-node` 설치 문제 해결

`@tensorflow/tfjs-node` 설치 중 오류가 발생할 경우,
`windows-build-tools` 패키지 설치 후 시도해볼수가 있는데,
`windows-build-tools` 패키지는 더 이상 권장되지 않으며, Node.js가 이제 Windows용 빌드 도구를 포함하고 있기 때문에 더 이상 필요하지 않을 수 있습니다. 대신, Microsoft의 C++ 빌드 도구를 직접 설치하는 것이 좋습니다.

## 설치 단계

### 1. Visual Studio 2019 또는 2022용 C++ 빌드 도구 설치

1. Visual Studio 설치 관리자를 실행합니다.
2. “변경”을 선택한 후, “워크로드” 탭에서 **“C++를 사용한 데스크톱 개발”**을 찾아 설치합니다.
3. 설치가 완료되면 컴퓨터를 다시 시작합니다.

### 2. Python 설치

TensorFlow.js는 Python이 필요할 수 있습니다. 다음 단계를 따라 Python을 설치합니다:

1. [공식 Python 웹사이트](https://www.python.org/downloads/)에서 Python을 다운로드하고 설치합니다.
2. 설치 중에 **"Add Python to PATH"** 옵션을 선택했는지 확인합니다.

### 3. 환경 변수 설정

설치 후 Python과 Python 스크립트 경로를 시스템 환경 변수에 수동으로 추가해야 할 수 있습니다:

- Python 실행 파일 경로 (예: `C:\Python39`)
- Python Scripts 경로 (예: `C:\Python39\Scripts`)

### 4. `@tensorflow/tfjs-node` 다시 설치

마지막으로 npm을 사용하여 `@tensorflow/tfjs-node`를 다시 설치해보세요:

```bash
npm install @tensorflow/tfjs-node
```
