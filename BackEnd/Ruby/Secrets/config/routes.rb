Rails.application.routes.draw do

  root 'sessions#new'

  resources :sessions, only: [:new, :create, :destroy]
  resources :users
  resources :secrets, only: [:index, :create, :destroy]
  resources :likes, only: [:create, :destroy]
  
  # resources :users, only: [:new, :create, :show, :edit]

  # get 'users/new' => 'users#new'

  # get 'users/show' 

  # get 'users/edit'

  # get 'sessions/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
