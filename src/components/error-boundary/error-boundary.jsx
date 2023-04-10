import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // с помощью этого метода меняем стейт компонента при возникновении ошибки:
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // с помощью этого метода логируем информацию об ошибке:
  componentDidCatch(error, info) {
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
        </section>
      );
    }
    // если всё работает штатно, рендерим дочерние компоненты
    return this.props.children;
  }
}
