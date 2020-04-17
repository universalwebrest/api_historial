<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Localidades extends REST_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        
        $this->load->model('localidades_model');        
    }
    
    
    public function index_get()
    {
        $query = $this->localidades_model->get();
        
        if (is_null($query))
        {
            $this->response(array("error" => "No hay localidades registradas"), 400);
        }
        else
        {
            $this->response(array("localidades" => $query), 200);
        }
        
    }
    
    
    public function find_get($id = null)
    {
        if (is_null($id))
        {
            $this->response(array("error" => "El ID fue null"), 400);
        }
        else{
            
            $localidad = $this->localidades_model->get($id);
            
            if (is_null($localidad))
            {
                $this->response(array("error" => "ID inexsistente"));
            }
            else 
            {
                $this->response(array("localidad" => $localidad), 200);
            }
        }
        
    }
    
    public function index_post()
    {
        if ($this->post('localidad'))
        {            
            $id = $this->localidades_model->save($this->post('localidad'));
            
            if ($id)
            {
                $this->response(array("id" => $id), 200);
            }
            else
            {
                $this->response(array("error" => "Hubo un problema en el modelo"), 400);
            }
        }
        else
        {
            $this->response(array("error" => "Objeto POST vacio"), 400);
        }
    }
    
    public function update_post($id = null)
    {
        if (!$this->post('data') || !$id)
        {
            $this->response(array("error" => "No se tiene valores en DATA o ID"), 400);
        }
        
        $update = $this->localidades_model->update($id, $this->post('data'));
        
        if ($update)
        {
            $this->response(array("response" => "Localidad modificada satisfactoriamente"), 200);
        }
        else 
        {
            $this->response(array("error" => "Error de servidor"), 400);
        }
    }
    
    public function index_delete($id = null)
    {
        if (!$id)
        {
            $this->response(array("error" => "Id es null"), 400);
        }
        
        $delete = $this->localidades_model->delete($id);
        
        if ($delete)
        {
            $this->response(array("response" => "Localidad eliminada"),200);
        }
        else
        {
            $this->response(array("error" => "Error en el servidor"), 400);
        }
        
    }
        
}

