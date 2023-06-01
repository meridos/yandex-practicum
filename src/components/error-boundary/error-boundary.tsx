import React, { PropsWithChildren } from "react";

interface IErrorBoundaryProps {
  error?: string | null;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  PropsWithChildren<IErrorBoundaryProps>
> {
  state: IErrorBoundaryState = { hasError: false };

  // с помощью этого метода меняем стейт компонента при возникновении ошибки:
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // с помощью этого метода логируем информацию об ошибке:
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Возникла ошибка!", error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError || this.props.error) {
      // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
          <pre>{this.props.error}</pre>
        </section>
      );
    }
    // если всё работает штатно, рендерим дочерние компоненты
    return this.props.children;
  }
}
